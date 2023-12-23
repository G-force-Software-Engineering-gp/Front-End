/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import Timeline from 'react-timelines';
import 'react-timelines/lib/css/style.css';
import { buildTimebar, buildTrack } from './builders';
import { NUM_OF_TRACKS, NUM_OF_YEARS, START_YEAR } from './constants';
import { fill } from './utils';

// eslint-disable-next-line no-alert
const clickElement = () => null;
// const clickElement = (element: any) => alert(`Clicked element\n${JSON.stringify(element, null, 2)}`);
const timebar = buildTimebar();

const MIN_ZOOM = 2;
const MAX_ZOOM = 20;

const BoardTimeline = () => {
  const now = new Date('2021-01-01');
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(2);

  
  const tracksById = fill(NUM_OF_TRACKS).reduce((acc: any, i: any) => {
    const track = buildTrack(i + 1);
    acc[track.id] = track;
    return acc;
  }, {});

  const [tracks, setTracks] = useState(Object.values(tracksById));

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

  const start = new Date(`${START_YEAR}`);
  const end = new Date(`${START_YEAR + NUM_OF_YEARS}`);

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
        // now={now}
        toggleTrackOpen={handleToggleTrackOpen}
        enableSticky
        scrollToNow
      />
    </div>
  );
};

export default BoardTimeline;
