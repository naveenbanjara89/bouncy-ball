import Phaser from 'phaser';
import { cloneElement, useEffect, useRef, useState } from 'react';

const PhaserGame = ({total_collisions}, { onSessionEnd }) => {
  // const [collisions, setcollisions] = useState(0)
  const collisions = useRef(0)
  const [temp, settemp] = useState(0)
  const [count, setcount] = useState(0)

    const [sessionId]=useState(Math.random().toString(36).substr(2, 9))
    const [startTime]=useState(new Date().toString().substring(0,24))
  let endTime=useRef(0)



  // useEffect(()=>{
  //   console.log("hii")
  // }, [temp])

  useEffect(() => {
    // let collisions = 0
    let bounces=0
    let initvelocity = 200
    let verticalvelocity=200
    let ht=500
    let wd = 800
    let timer;
    let ball;
    let sessionId = Math.random().toString(36).substr(2, 9);
    let startTime = new Date;
    collisions.current=0
    // let countdown = Math.floor(Math.random() * (120 - 30) + 30) * 1000; // Random countdown from 30 to 120 seconds

    const config = {
      type: Phaser.AUTO,
      width: wd,
      height: ht,
      backgroundColor: '#FFFFFF',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 10 }, debug: false },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('ball', 'poki2.png'); // Load your ball image
      // console.log("preloaded")
      this.load.image('background', 'Jungle.png'); // Load your ball image
      this.load.audio('tick', 'path_to_clock_sound'); // Clock ticking sound
    }
    
    function create() {
      // console.log("created")
      this.add.image(400, 250, 'background');
      
      ball = this.physics.add.sprite(400, 300, 'ball');
      ball.setVelocity(0, initvelocity);
      // ball.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
      ball.setCollideWorldBounds(true);
      ball.setBounce(1);
      ball.setDisplaySize(50, 50);
      

      // this.sound.play('tick', { loop: true });

      // Start the countdown timer
      // timer = setTimeout(() => {
      //   // this.sound.stopAll();
      //   ball.setVelocity(0, 0); // Stop the ball when time is over

      //   onSessionEnd({
      //     sessionId,
      //     startTime,
      //     endTime: Date.now(),
      //   });

      //   game.destroy(true); // Clean up the game
      // }, countdown);

    }

    function update() {
      // console.log(ball.y)
      // Update the game state
      // console.log(total_collisions)


      if(collisions.current==total_collisions){
        ball.setVelocity(0,0)
        // endTime.current=Date.now()
        // showEndDate()
        game.destroy(true)
      }

      if(ball.y<200){
        ball.setVelocity(0,verticalvelocity)
      }

      

      // if(ball.y>=ht-ball.height+16){
      if(ball.y>=475){
        // console.log("ball height :"+ball.height)
        updateCollision()
        // console.log(verticalvelocity)
      }
    }

    // function restart(){
    //   console.log("restarting...")
    //   collisions.current=0
    //   ball.setVelocity(0,verticalvelocity)
    // }

    return () => {
      clearTimeout(timer); // Clear the timer on unmount
      game.destroy(true); // Destroy the game on unmount
    };
  }, [onSessionEnd, count]);


  function restart(){
    console.log("restarting...")
      setcount(count+1)
    }


  
  function updateCollision(){
    endTime.current=new Date().toString().substring(0,24)
    settemp(collisions.current+1)
    collisions.current=collisions.current+1
    // console.log("collisions outsides : "+collisions.current)
  }

  // function showEndDate(){
  //   endTime=new Date().toString()
  // }

    return (
      <>
        <div id="phaser-container">
        Bounce : {collisions.current}<br/>
        Session Id: {sessionId}<br/>
        Start Time: {startTime}<br/>
        End Time: {endTime.current}
      </div>
      <button onClick={()=>{restart()}}>start again</button>
      </>
    )
};

export default PhaserGame;