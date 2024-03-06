'use client'

import { useState, useRef } from "react";
import { PlayerControllers } from "./player-controllers";
// temp
import * as musicMetadata from 'music-metadata-browser';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(new Audio('audio/sample.mp3'));
  const useFile = useRef<HTMLInputElement>(null);

  // temp
  const [metadata, setMetadada] = useState<musicMetadata.IAudioMetadata>();

  const onloadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    musicMetadata.parseBlob(file).then((metadata: musicMetadata.IAudioMetadata) => {
      setMetadada(metadata)
    })
    audioRef.current!.src = URL.createObjectURL(useFile.current!.files![0]);
  }

  return (
    <div className="flex">
      <img
        alt="song album image"
        src={metadata?.common.picture ?
          `data:${metadata.common.picture[0].format};base64,${metadata.common.picture[0].data.toString('base64')}`
          : 'images/default-album.png'
        }
        width={300}
        height={300}
      />

      <div className="flex flex-col w-full pl-4">

        <div className="grow flex flex-col justify-end mb-4 border-2 border-red-600">
          <h2 className="text-2xl">{metadata?.common.title ?? 'Title'}</h2>
          <h3 className="text-lg">{metadata?.common.artist ?? 'Artist'}</h3>
          <h3 className="text-lg">{metadata?.common.album ?? 'Album'}</h3>
        </div>

        {/* // TODO: improve file input */}
        <input type="file" ref={useFile} onChange={onloadedFile}>
        </input>
        
        <PlayerControllers audioRef={audioRef} />
      </div>
    </div>
  );
}