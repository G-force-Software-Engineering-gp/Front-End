import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import {
  Active,
  closestCorners,
  DataRef,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DroppableContainer,
  getFirstCollision,
  KeyboardCode,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MouseSensor,
  Over,
  TouchSensor,
  useDndContext,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { cva } from 'class-variance-authority';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { useBoard } from '../hooks/useBoard';
import { useMembers } from '../hooks/useMembers';
import { Board, Card, List } from '../types';
import { BoardList, ColumnDragData, ListCard, TaskDragData } from './BoardList';
import CreateListModal from './CreateListModal';

const directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      const data = entry.data.current;

      if (data) {
        const { type, children } = data;

        if (type === 'Column' && children?.length > 0) {
          if (active.data.current?.type !== 'Column') {
            return;
          }
        }
      }

      switch (event.code) {
        case KeyboardCode.Down:
          if (active.data.current?.type === 'Column') {
            return;
          }
          if (collisionRect.top < rect.top) {
            // find all droppable areas below
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (active.data.current?.type === 'Column') {
            return;
          }
          if (collisionRect.top > rect.top) {
            // find all droppable areas above
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            // find all droppable areas to left
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          // find all droppable areas to right
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, 'id');

    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        return {
          x: newRect.left,
          y: newRect.top,
        };
      }
    }
  }

  return undefined;
};
export type ColumnId = List['id'];
type DraggableData = ColumnDragData | TaskDragData;
export const KanbanBoard = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const { data } = useBoard(parseInt(boardId ? boardId : ''));

  const [columns, setColumns] = useState<List[]>([]);
  useEffect(() => {
    if (data !== undefined) {
      setColumns(data?.list);
    }
  }, [data]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const [activeList, setActiveList] = useState<List | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );
  const { mutate: moveCardMutation } = useMutation(
    async (newCardData) => {
      // Make the API call to update the card's columnId
      const response = await fetch(`your-api-endpoint-for-moving-cards`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization header
        },
        body: JSON.stringify(newCardData),
      });

      if (!response.ok) {
        throw new Error('Failed to move card');
      }

      return response.json();
    },
    {
      // You can use onSuccess and onError callbacks if needed
      onSuccess: () => {},
    }
  );

  let authTokens = useContext(AuthContext)?.authTokens;
  const dndTask = useMutation({
    mutationFn: ({
      list,
      order,
      cardId,
    }: {
      list: number | undefined;
      order: number | undefined;
      cardId: number | undefined;
    }) => {
      // console.log(list, order, cardId);
      return fetch(BaseURL + `tascrum/boards/${boardId}/dnd/${cardId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify({ list, order }),
      })
        .then((response) => response.json())
        .then((rs) => console.log(rs));
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      // Invalidate and refetch queries after the mutation is successful
      queryClient.invalidateQueries(['list' /* your list id */]);
      queryClient.invalidateQueries(['board' /* your board id */]);
      // Add more invalidation keys if needed
    },
  });
  return (
    <>
      <DndContext
        // accessibility={{
        //   announcements,
        // }}
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <BoardContainer>
          <SortableContext items={columnsId}>
            {data !== undefined &&
              columns.map((list) => (
                <>
                  <BoardList key={list.id} listId={list.id} columns={columns} boardId={data.id} />
                </>
              ))}
          </SortableContext>
          <div className="relative flex max-h-full w-72 shrink-0 flex-col justify-center py-2">
            {data !== undefined && <CreateListModal boardId={data.id} />}
          </div>
        </BoardContainer>
        {'document' in window &&
          createPortal(
            <DragOverlay>
              {data !== undefined && activeList && (
                <BoardList
                  key={activeList.id}
                  listId={activeList.id}
                  columns={data.list}
                  boardId={data.id}
                  isOverlay
                  // column={activeList}
                  // tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                />
              )}
              {data !== undefined && activeCard && (
                <ListCard
                  key={activeCard.id}
                  columns={data.list}
                  cardId={activeCard.id}
                  listId={activeCard.id}
                  isOverlay
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </>
  );
  function hasDraggableData<T extends Active | Over>(
    entry: T | null | undefined
  ): entry is T & {
    data: DataRef<DraggableData>;
  } {
    if (!entry) {
      return false;
    }

    const data = entry.data.current;

    if (data?.type === 'Column' || data?.type === 'Task') {
      return true;
    }

    return false;
  }

  // function getDraggingTaskData(taskId: number, columnId: ColumnId) {
  //   const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
  //   const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
  //   const column = columns.find((col) => col.id === columnId);
  //   return {
  //     tasksInColumn,
  //     taskPosition,
  //     column,
  //   };
  // }
  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data: any = event.active.data.current;
    // console.log('start');
    // console.log(data);
    if (data?.type === 'Column') {
      setActiveList(data.list);
      return;
    }

    if (data?.type === 'Task') {
      setActiveCard(data.card);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveList(null);
    setActiveCard(null);
    // console.log('end');
    // console.log(event);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === 'Column';
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    // console.log('over');
    // console.log(event);

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (data === undefined) return;
    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === 'Task';
    const isOverATask = activeData?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const ListsData = data?.list.map((list) => queryClient.getQueryData(['list', list.id]) as List);
      // console.log(ListsData);
      const findCardInfo = (ListsData: List[], cardid: number) => {
        let result: { listId: null | number; cardId: null | number; card: Card | null } = {
          listId: null,
          cardId: null,
          card: null,
        };
        _.forEach(ListsData, (list) => {
          const card = _.find(list.card, { id: cardid });
          if (card) {
            result = { listId: list.id, cardId: card.id, card: queryClient.getQueryData(['card', card.id]) as Card };
            return false; // Break out of the loop once a match is found
          }
        });
        return result;
      };
      console.log('activeID,overid', activeId, overId);
      // queryClient.setQueryData(['list', ]);

      const activeIndes = findCardInfo(ListsData, activeId as number);
      const overIndes = findCardInfo(ListsData, overId as number);
      console.log('activeID,overId', activeIndes, overIndes);

      // const activeIndex = tasks.findIndex((t) => t.id === activeId);
      // const overIndex = tasks.findIndex((t) => t.id === overId);
      const activeTask = activeIndes.card;
      const overTask = overIndes.card;
      // setTasks((tasks) => {
      if (activeTask && overTask) {
        activeTask.list = overTask.list;
        // console.log(activeTask.list !== overTask.list ? overTask.list : activeTask.list);
        // console.log(overTask.order);
        dndTask
          .mutateAsync({
            list: activeTask.list !== overTask.list ? overTask.list : activeTask.list,
            order: overTask.order,
            cardId: activeTask.id,
          })
          .then(() => {
            queryClient.invalidateQueries(['list', overTask.list]);
            const a = queryClient.getQueryData(['list', overTask.list]) as List;
            const b = queryClient.getQueryData(['list', activeTask.list]) as List;
            a?.card?.map((item) => queryClient.invalidateQueries(['card', item.id]));
            b?.card?.map((item) => queryClient.invalidateQueries(['card', item.id]));
          });
        // return arrayMove(tasks, activeIndex, overIndex - 1);
      }
      // return arrayMove(tasks, activeIndex, overIndex);
      // });
    }

    const isOverAColumn = overData?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      // setTasks((tasks) => {
      //   const activeIndex = tasks.findIndex((t) => t.id === activeId);
      //   const activeTask = tasks[activeIndex];
      //   if (activeTask) {
      //     activeTask.columnId = overId as ColumnId;
      //     return arrayMove(tasks, activeIndex, activeIndex);
      //   }
      //   return tasks;
      // });
    }
  }
};

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva(
    'duration-[.25s] flex w-full items-start space-x-4 overflow-x-auto overflow-y-hidden p-5 transition-all', // px-2 md:px-0 lg:justify-center
    {
      variants: {
        dragging: {
          default: 'snap-x snap-mandatory',
          active: 'snap-none',
        },
      },
    }
  );

  return (
    <div
      className={variations({
        dragging: dndContext.active ? 'active' : 'default',
      })}
    >
      <div className="flex flex-row items-start justify-center gap-4">{children}</div>
    </div>
  );
}
