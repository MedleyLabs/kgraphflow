import React, { useState, useEffect } from 'react';
import Slider from 'react-input-slider';
import { parseGIF, decompressFrames } from 'gifuct-js';

const GifSlider = ({ gifUrl, idx, gifStyle, sliderStyles }) => {

    const [frames, setFrames] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(idx || 0);

    useEffect(() => {
        fetch(gifUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => {

                let gif = parseGIF(buffer);
                let decompressedFrames = decompressFrames(gif, true);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = gif.lsd.width;
                canvas.height = gif.lsd.height;

                let prevDisposalType;

                const frameDataURLs = decompressedFrames.map((frame, i) => {

                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');

                    tempCanvas.width = frame.dims.width;
                    tempCanvas.height = frame.dims.height;

                    const frameImageData = tempCtx.createImageData(frame.dims.width, frame.dims.height);
                    frameImageData.data.set(frame.patch);
                    tempCtx.putImageData(frameImageData, 0, 0);

                    if (i === 0 || prevDisposalType === 2) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(tempCanvas, frame.dims.left, frame.dims.top);

                    prevDisposalType = frame.disposalType;

                    return canvas.toDataURL('image/png');
                });

                setFrames(frameDataURLs);
            });
    }, [gifUrl]);

    const handleSliderChange = (position) => {
        setCurrentIdx(position.x);
    };

    return (
        <div className="gif-slider" style={gifStyle}>
            {frames.length > 0 && (
                <div>
                    {frames.map((frameDataURL, index) => (
                        <img
                            key={index}
                            src={frameDataURL}
                            alt={`Frame ${index}`}
                            style={{
                                display: index === currentIdx ? 'block' : 'none',
                                width: '150px',
                                marginRight: '30px',
                                height: 'auto',
                            }}
                        />
                    ))}
                </div>
            )}
            <Slider
                axis="x"
                xstep={1}
                xmin={0}
                xmax={frames.length - 1}
                x={currentIdx}
                onChange={handleSliderChange}
                style={{width: '150px', ...sliderStyles}}
                styles={{
                    active: {
                        backgroundColor: 'dodgerblue'
                    },
                }}
            />
        </div>
    );
};

export default GifSlider;
