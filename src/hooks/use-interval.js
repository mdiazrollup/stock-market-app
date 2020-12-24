import {useEffect, useRef} from 'react';

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    //Remember latests callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    //Set interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        };

        if(delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay]);
}