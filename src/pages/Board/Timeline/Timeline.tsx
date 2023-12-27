/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { useParams } from 'react-router';
import { buildTimebar } from './builders';
import { NUM_OF_TRACKS, NUM_OF_YEARS, START_YEAR } from './constants';
import { useTimeline } from './useTimeline';
import { colourIsLight, fill, hexToRgb, nextColor } from './utils';

// eslint-disable-next-line no-alert
const clickElement = () => null;

// const clickElement = (element: any) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);
const timebar = buildTimebar();

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

const BoardTimeline = () => {
  const { boardId } = useParams();
  const { data: TimelineData } = useTimeline(boardId);
  // Setting Arrays

  useEffect(() => {
    if (TimelineData) {
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
  }, [TimelineData]);
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
    console.log(trackId);
    const v: any[] = [];
    const w: any[] = [];
    const cards = TimelineData.members[trackId - 1].cards;
    for (let i = 0; i < cards.length; i++) {
      console.log('start: ', cards[i].startdate);
      console.log('end: ', cards[i].duedate);
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
    return v;
  };

  const buildTrack = (trackId: any, username: string) => {
    // const tracks = fill(Math.floor(Math.random() * MAX_NUM_OF_SUBTRACKS) + 1).map((i) => buildSubtrack(trackId, i + 1));
    return {
      id: `track-${trackId}`,
      title: username, // Name of the user
      elements: buildElements(trackId, TimelineData),
      // tracks,
      isOpen: false,
    };
  };

  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [tracks, setTracks] = useState([]);

  const start = new Date(`${2020}`);
  const end = new Date(`${2024}`);

  return (
    <div className="w-full p-8">
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
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(track));
        }}
        tracks={tracks}
        timebar={timebar}
        toggleTrackOpen={handleToggleTrackOpen}
        enableSticky
        scrollToNow
      />
    </div>
  );
};

export default BoardTimeline;
