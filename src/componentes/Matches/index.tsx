import React from "react"
import './styles.scss'
import { IconFlag } from "../IconFlag"
type TextInputProp = {
    data:{
            matchday:number,
            teams:{
                homeTeam:{id:number,name:string,flag:string},
                awayTeam:{id:number,name:string,flag:string}
            }[]
    }
}

export const Matches = ({data}:TextInputProp)=>{
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
        return (
            <div className="matches-wapper">
                <h4 className="matches-title">{data.matchday}º Rodada</h4>
                <ul className="list">
                    {data.teams.map((match, indice) => (
                    <li key={data.matchday+indice}>
                        <IconFlag  src={match.homeTeam.flag}/>{match.homeTeam.name} <span className="part">x</span> <IconFlag src={match.awayTeam.flag}/>{match.awayTeam.name} 
                    </li>
                    ))}
                </ul>
            </div>
        );

}
