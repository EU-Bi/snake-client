import React, {Component} from "react";
import "./Game.css"
import { store } from "../store/store";
import actionGetScore from "../store/actions/actionGetScore";


const  HEIGHT = 10;
const  WIDTH  = 10;

// mapping keycode  for changing direction
const LEFT  = 37; 
const UP    = 38;
const RIGHT = 39; 
const DOWN  = 40;
const STOP  = 32; /* [space] used for pause */


const getRandom = () => {
    return  { 
        x: Math.floor(Math.random() *WIDTH),
        y: Math.floor(Math.random() *HEIGHT) 
    }
}


const emptyRows = () => [...Array(WIDTH)].map((_) => [...Array(HEIGHT)].map((_)=> 'grid-item'));


const increaseSpeed = (speed) =>{
        return(
            speed - 10 *(speed > 10))
    }

const increaseScore = (score)=>{
    if(score.length===0||score[score.length-1]===10){
        return score.push(1)
    }if(score[score.length-1]===1){
        return score.push(5)
    }
    if(score[score.length-1]===5){
        return score.push(10)
    }
}

const result = (score)=>score.reduce((acc,num)=>acc + num,0)


const initialState = {
    rows: emptyRows(),
    snake: [getRandom()],
    food: getRandom(),
    direction: STOP,
    speed: 300,
    score:[],
    result:0,
}

class Game extends Component {

    

    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.changeDirection;
    }

    componentDidUpdate() {
        this.isCollapsed();
        this.isEaten();
    }

    moveSnake = () => {
        let snakeCopy = [...this.state.snake];
        let head  =  {...snakeCopy[snakeCopy.length-1]};
        switch (this.state.direction) {
            case LEFT:  head.y += -1; break;    
            case UP:    head.x += -1; break;
            case RIGHT: head.y += 1;  break;
            case DOWN:  head.x += 1;  break;
            default: return;
        }
        /* keep the value within range of 0 to HEIGHT */
        head.x += HEIGHT * ((head.x<0)-(head.x>=HEIGHT));
        head.y += WIDTH * ((head.y<0)-(head.y>=WIDTH));
        
        snakeCopy.push(head); 
        snakeCopy.shift()
        this.setState({
            snake: snakeCopy,
            head: head
        });
        this.update(); 
    }   
    
    isEaten() {
        let snakeCopy  = [...this.state.snake];
        let head  =  {...snakeCopy[snakeCopy.length-1]};
        let food = this.state.food;
        let score =[...this.state.score];
        if ((head.x === food.x) &&(head.y === food.y)) {           
            
            increaseScore(score)
            snakeCopy.push(head);
            this.setState({
                snake: snakeCopy,
                food: getRandom(),
                score:score,
                result:result(score),
                speed: increaseSpeed(this.state.speed),
                
            });
        }
        
    }

    update() {
        let newRows = emptyRows(); 
        this.state.snake.forEach(element => newRows[element.x][element.y] = 'snake')
        newRows[this.state.food.x][this.state.food.y] = 'food';
        this.setState({rows: newRows});
    }


    isCollapsed = () => {
        let snake = this.state.snake;
        let head  = {...snake[snake.length-1]}
        let score = this.state.score
        for (let i=0; i<snake.length-3; i++) {
            if ((head.x === snake[i].x) &&(head.y === snake[i].y)) {
                this.setState(initialState);
                if(store.getState().user.payload.user.score<result(score)){
                    store.dispatch(actionGetScore(store.getState().user.payload.user.id,result(score)))
                }                
                alert(`game over: ${result(score)}`)
            }
        }
    }

    changeDirection = ({keyCode}) => { 
        let direction = this.state.direction;
        switch (keyCode) {
            case LEFT:
                direction = (direction === RIGHT)? RIGHT: LEFT;
                break;
            case RIGHT:
                direction = (direction === LEFT)? LEFT: RIGHT;
                break;
            case UP:
                direction = (direction === DOWN)? DOWN: UP;
                break;
            case DOWN:
                direction = (direction === UP)? UP: DOWN;
                break;
            case STOP:
                direction = STOP;
                break;
            default:
                break;
        }
        this.setState({
            direction: direction
        });
    }    

   
    render() {
        const displayRows = this.state.rows.map((row, i) => row.map((value, j) =>  <div name={`${i}=${j}`} className={value} />))
        return (
            <div className="a">
                <div className="snake-container">
                <ul>
                    <li>press "space" to pause the game.</li>
                    <li>press "arrow keys" to change direction/ unpause.</li>
                </ul>
                <>Your score: {this.state.result}</>
                    <div className="grid">{displayRows}</div>
                </div>
            </div>
        )    
    }
}












export default Game