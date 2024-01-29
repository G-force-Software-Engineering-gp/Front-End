/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useParams } from 'react-router';
import { buildTimebar } from './builders';
import { useTimeline } from './useTimeline';
import { useTimelineEnd } from './useTimelineEnd';
import { useTimelineLabel } from './useTimelineLabel';
import { useTimelineList } from './useTimelineList';
import { useTimelineStart } from './useTimelineStart';
import { colourIsLight, fill, hexToRgb, nextColor } from './utils';

// eslint-disable-next-line no-alert
const clickElement = () => null;

// const clickElement = (element: any) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);
const timebar = buildTimebar();

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

const BoardTimeline = () => {
  const { boardId } = useParams();
  const { data: TimelineData, isLoading: loadingTable } = useTimeline(boardId);
  const { data: TimelineDataLabel, isLoading: loadingTableLabel } = useTimelineLabel(boardId);
  const { data: TimelineDataList, isLoading: loadingTableList } = useTimelineList(boardId);
  const { data: TimelineDataStart, isLoading: loadingStart } = useTimelineStart(boardId);
  const { data: TimelineDataEnd, isLoading: loadingEnd } = useTimelineEnd(boardId);
  const [selectedValue, setSelectedValue] = useState('Members');
  // Setting Arrays
  console.log(TimelineDataLabel);

  useEffect(() => {
    if (TimelineData && selectedValue === 'Members') {
      let members: any[] = [];
      for (let i = 0; i < TimelineData.members?.length; i++) {
        members.push(TimelineData?.members[i].user.username);
      }

      // Rebuild tracks based on new data
      const updatedTracks = fill(members.length).reduce((acc: any, _, index) => {
        const track = buildTrack(index + 1, members[index]);
        acc[track.id] = track;
        return acc;
      }, {});

      setTracks(Object.values(updatedTracks));
    }
    if (TimelineDataList && selectedValue === 'Lists') {
      let lists: any[] = [];
      for (let i = 0; i < TimelineDataList.lists?.length; i++) {
        lists.push(TimelineDataList?.lists[i].title);
      }

      // Rebuild tracks based on new data
      const updatedTracks = fill(lists.length).reduce((acc: any, _, index) => {
        const track = buildTrack(index + 1, lists[index]);
        acc[track.id] = track;
        return acc;
      }, {});

      setTracks(Object.values(updatedTracks));
    }
    if (TimelineDataLabel && selectedValue === 'Labels') {
      let labels: any[] = [];
      for (let i = 0; i < TimelineDataLabel.labels?.length; i++) {
        labels.push(TimelineDataLabel?.labels[i].title);
      }

      // Rebuild tracks based on new data
      const updatedTracks = fill(labels.length).reduce((acc: any, _, index) => {
        const track = buildTrack(index + 1, labels[index]);
        acc[track.id] = track;
        return acc;
      }, {});

      setTracks(Object.values(updatedTracks));
    }
    if (TimelineDataStart && TimelineDataEnd) {
      if (TimelineDataStart[0]?.startdate && TimelineDataEnd[0]?.duedate) {
        console.log(TimelineDataStart[0].startdate);
        const start1 = new Date(TimelineDataStart[0].startdate);
        const end1 = new Date(TimelineDataEnd[0].duedate);

        if (start1.getFullYear() === end1.getFullYear()) {
          setstart(new Date(`${start1.getFullYear()}`));
          setend(new Date(`${start1.getFullYear() + 1}`));
        } else {
          setstart(new Date(`${start1.getFullYear()}`));
          setend(new Date(`${end1.getFullYear() + 1}`));
        }
      } else {
        // Handle the case when either start date or end date is null
        // Set default values or handle it accordingly
        setstart(new Date('2023-01-01')); // Default start date
        setend(new Date('2024-01-01')); // Default end date
      }
    }
  }, [TimelineData, TimelineDataStart, TimelineDataEnd, selectedValue]);
  // No Change
  const handleToggleOpen = () => {
    setOpen((prevOpen: any) => !prevOpen);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom: any) => Math.min(prevZoom + 1, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom: any) => Math.max(prevZoom - 1, MIN_ZOOM));
  };

  const handleToggleTrackOpen = (track: any) => {
    setTracks((prevTracks: any) => {
      const updatedTracksById = {
        ...prevTracks.reduce((acc: any, t: any) => {
          acc[t.id] = t;
          return acc;
        }, {}),
        [track.id]: {
          ...track,
          isOpen: !track.isOpen,
        },
      };

      return Object.values(updatedTracksById);
    });
  };

  // Important Part
  const buildElement = ({ title, trackId, start, end, i }: any) => {
    // Adding a params

    const bgColor = nextColor();
    const color = colourIsLight(hexToRgb(bgColor)[0], hexToRgb(bgColor)[1], hexToRgb(bgColor)[2])
      ? '#000000'
      : '#ffffff';
    return {
      id: `t-${trackId}-el-${i}`,
      title: title,
      start,
      end,
      style: {
        backgroundColor: `#${bgColor}`,
        color,
        borderRadius: '4px',
        boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
        textTransform: 'capitalize',
      },
    };
  };

  const buildElements = (trackId: any, TimelineData: any) => {
    // console.log(trackId);
    const v: any[] = [];
    if (selectedValue === 'Members') {
      const cards = TimelineData.members[trackId - 1].cards;
      // console.log(cards);
      for (let i = 0; i < cards.length; i++) {
        const start = new Date(cards[i].startdate);
        const end = new Date(cards[i].duedate);
        if (cards[i].startdate != null) {
          v.push(
            buildElement({
              title: cards[i].title,
              trackId,
              start,
              end,
              i,
            })
          );
        }
      }
    }
    if (selectedValue === 'Lists') {
      const cards = TimelineDataList.lists[trackId - 1].cards;
      console.log(cards);
      for (let i = 0; i < cards.length; i++) {
        const start = new Date(cards[i].startdate);
        const end = new Date(cards[i].duedate);
        if (cards[i].startdate != null) {
          v.push(
            buildElement({
              title: cards[i].title,
              trackId,
              start,
              end,
              i,
            })
          );
        }
      }
    }
    if (selectedValue === 'Labels') {
      const cards = TimelineDataList.labels[trackId - 1].cards;
      console.log(cards);
      for (let i = 0; i < cards.length; i++) {
        const start = new Date(cards[i].startdate);
        const end = new Date(cards[i].duedate);
        if (cards[i].startdate != null) {
          v.push(
            buildElement({
              title: cards[i].title,
              trackId,
              start,
              end,
              i,
            })
          );
        }
      }
    }
    return v;
  };
  const buildTrack = (trackId: any, username: string) => {
    return {
      id: `track-${trackId}`,
      title: username, // Name of the user
      elements: buildElements(trackId, TimelineData),
      // tracks: tracks1,
      isOpen: false,
    };
  };

  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [tracks, setTracks] = useState([]);

  const [start, setstart] = useState(new Date(`${2022}`));
  const [end, setend] = useState(new Date(`${2028}`));

  const getRadio = (event: any) => {
    setSelectedValue(event.target.value);
  };
  // console.log(selectedValue);

  return (
    <div className="w-full p-8">
      <span>Show the Timeline based on: </span>
      <RadioGroup defaultValue="Members" className=" mb-4 flex">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Members" id="r1" onClick={(e) => getRadio(e)} />
          <Label htmlFor="r1" className=" text-lg font-bold">
            Members{' '}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Labels" id="r2" onClick={(e) => getRadio(e)} />
          <Label htmlFor="r2" className=" text-lg font-bold">
            Labels
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Lists" id="r3" onClick={(e) => getRadio(e)} />
          <Label htmlFor="r3" className=" text-lg font-bold">
            Lists{' '}
          </Label>
        </div>
      </RadioGroup>
      {loadingTable || loadingStart || loadingEnd ? (
        'loading'
      ) : (
        <Timeline
          scale={{
            start,
            end,
            zoom,
            zoomMin: MIN_ZOOM,
            zoomMax: MAX_ZOOM,
          }}
          isOpen={open}
          toggleOpen={handleToggleOpen}
          zoomIn={handleZoomIn}
          zoomOut={handleZoomOut}
          clickElement={clickElement}
          clickTrackButton={(track: any) => {
            alert(JSON.stringify(track));
          }}
          tracks={tracks}
          timebar={timebar}
          toggleTrackOpen={handleToggleTrackOpen}
          enableSticky
          scrollToNow
        />
      )}
    </div>
  );
};

export default BoardTimeline;
