import { useState, useEffect } from 'react'
import style from '../styles/components/Countdown.module.css'

let countdownTimeout : NodeJS.Timeout;

export function Countdown() {
    const tempo= (0.1*60)
    const [time, setTime] = useState(tempo);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished]=useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown() {
        setisActive(true);
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout)
        setisActive(false);
        setTime(tempo);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout= setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if( isActive && time ===0){
            setHasFinished(true);
            setisActive(false);
        }
    }, [isActive, time])

    return (
        <div>
            <div className={style.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            {hasFinished?(
                 <button
                 disabled
                 type="button"
                 className={style.countDownButton}
             >
                   Ciclo encerrado
             </button>
            ):(
                <>
                {isActive ? (
                    <button
                    type="button"
            className={`${style.countDownButton} ${style.countDownButtonActive}`}
    
                    onClick={resetCountDown}
                >
                     Abandonar ciclo
                </button>
    
          ):
          (
            <button
            type="button"
    
            className={style.countDownButton}
            onClick={startCountDown}
        >   
                    Iniciar um novo cliclo
           
        </button>
          )}
          </>
            )
            }


          
        </div>
    )
}