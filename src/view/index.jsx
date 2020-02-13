import React, { Component } from "react";
import { Button, Modal, Row, Col } from "antd";
import "./index.scss";

function shuffle(a) {
  var len = a.length;
  for (var i = 0; i < len; i++) {
    var end = len - 1;
    var index = (Math.random() * (end + 1)) >> 0;
    var t = a[end];
    a[end] = a[index];
    a[index] = t;
  }
  return a;
}
class Index extends Component {
    
  constructor(arg) {
    super(arg);
    const timer=1;
    this.state = {
      step: 30,
      Cardface: shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
      ShadingList: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      gamestep: [
        {
          index: null,
          value: null
        },
        {
          index: null,
          value: null
        }
      ],
      start: false,
      visible:false,
      Gametitle:"游戏结束！",
      Clickflag:true
    };
  }
  componentDidMount() {
    let container = document.getElementById("container");
    let containerWidth = container.offsetWidth;
    container.style.height = containerWidth * 0.75 + "px";
    let boxWidth = (containerWidth - 100) / 4 - 1;
    let box = document.getElementsByClassName("box");
    Array.from(box).forEach(item => {
      item.style.width = boxWidth + "px";
      item.style.height = boxWidth + "px";
    });
  }
 
  GameOver(Cardface){
      let flag=true;
      for(let i=0,j=Cardface.length;i<j;i++){
          if(Cardface[i]!=null){
              flag=false;
          }
      }
      if(flag){
        this.setState({
            Gametitle:"恭喜过关！",
            visible:true
        })
      }

  }
  NewGame=()=>{
      if(this.timer){
        clearTimeout(this.timer);
      }
    this.setState({
        step: 30,
        Cardface: shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        ShadingList: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        gamestep: [
          {
            index: null,
            value: null
          },
          {
            index: null,
            value: null
          }
        ],
        start: false,
        visible:false,
        Gametitle:"游戏结束！",
        Clickflag:true
    });
    
  }
  judge(i){
      let Clickflag=this.state.Clickflag
      if(Clickflag){
          this.boxonclick(i)
      }
  }
  boxonclick(i) {
    let { gamestep, ShadingList, Cardface, step, start } = this.state;
    let ShadingListstep=ShadingList;
    ShadingListstep[i] = true;
    this.setState({
      ShadingList:ShadingListstep,
      step: step - 1
    })
    if (step - 1 >0) {
       
      if (!start) {
        gamestep[0] = {
          index: i,
          value: Cardface[i]
        };
        this.setState({
            gamestep,
            start:!start
        })
      }else{
        gamestep[1] = {
            index: i,
            value: Cardface[i]
        };
       
        if(gamestep[0].value===gamestep[1].value){
            Cardface[gamestep[0].index]=null
            Cardface[gamestep[1].index]=null
            this.GameOver(Cardface)
            this.setState({
                gamestep: [
                    {
                      index: null,
                      value: null
                    },
                    {
                      index: null,
                      value: null
                    }
                  ],
                Cardface,
                start:!start
            })
        }else{
            this.setState({
                start:!start,
                Clickflag:false,
                gamestep: [
                    {
                      index: null,
                      value: null
                    },
                    {
                      index: null,
                      value: null
                    }
                  ]
            })
           
            this.timer= window.setTimeout(()=>{
                ShadingListstep[gamestep[0].index]=false
                ShadingListstep[gamestep[1].index]=false
                
                this.setState({
                    ShadingList:ShadingListstep,
                    Clickflag:true
                })
            },5000)
        }
        
      }
    } else {
        this.setState({
            visible:true
        })
    }

    
  }
  render() {
    return (
      <div className="index">
        <Row>
          <Col xs={1} md={8}></Col>
          <Col xs={22} md={8}>
            <div className="header">Memory</div>
            <div className="title">
              <Button type="primary">Step: {this.state.step}</Button>
              <Button
                type="primary"
                onClick={() => {
                  this.NewGame();
                }}
              >
                New Game
              </Button>
            </div>
            <div className="content" id="container">
              {this.state.ShadingList.map((item, i) => {
                if (item) {
                  return (
                    <div className="box" key={i}>
                      {this.state.Cardface[i]}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="box Mask"
                      key={i}
                      onClick={() => {
                        this.judge(i);
                      }}
                    ></div>
                  );
                }
              })}
            </div>
            <Modal
          title="Game Over"
          visible={this.state.visible}
          onOk={this.NewGame}
          onCancel={this.NewGame}
        >
          <p>{this.state.Gametitle}</p>
        </Modal>
          </Col>
          <Col xs={1} md={8}></Col>
        </Row>
      </div>
    );
  }
}

export default Index;
