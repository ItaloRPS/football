import { SelectChangeEvent } from "@mui/material"
import { setgroups } from "process"
import React, { Suspense, useEffect, useState } from "react"
import { Header } from "../../componentes/Header"
import { IconFlag } from "../../componentes/IconFlag"
import { Loading } from "../../componentes/Loading"
import { Matches } from "../../componentes/Matches"
import { TextSelect } from "../../componentes/TextSelect"
import { Football } from "../../services/football-services"
import './styles.scss'

type matchesProps =  {
  matchday: number;
  teams: any;
}[]

type roudsProps =  {
  name: string;
  value: string;
}[]

export const Home = ()=>{
    const [championshipId, setChampionshipId] = useState<string|number|undefined>();
    const [title, setTitle] = useState<any>();
    const [group, setGroup] = useState<string|number|undefined>();
    const [competitions, setCompetitions] = useState<any>([]);
    const [team, setTeam] = useState([]);
    const [rouds, setRouds] = useState<roudsProps>([]);
    const [matches, setMatches] = useState<matchesProps>([]);
    const [dataMatches, setDataMatches] = useState<matchesProps>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
      const getCompetitions = async () => {
            const resp = await Football.competitions();
            const data = resp.result?.competitions.map((comps:any)=>{
              return {
                name:comps.name,
                img:comps.emblem,
                value:comps.id
              }
            })
            setCompetitions(data)
        }

    getCompetitions();
    },[])



    const handleChangeChampionship = async (event: SelectChangeEvent<any>) => {
        const {target: { value }} = event;
        setChampionshipId(value)
        setLoading(true);
       const matches = await getMatches(value)
       const datas = groupByMatches(matches)
       matches?setTitle({name:matches[0]?.competition?.name, flag:matches[0]?.competition?.emblem}):setTitle(undefined)
       setMatches(datas.matches)
       setDataMatches(datas.matches)
       setRouds(datas.rouds)
       getTeams(value)
       setLoading(false);
    };

    const handleChangeGroup = (event: SelectChangeEvent<any>) => {
        const {target: { value }} = event;
        setLoading(true);
          if (!value) {
            setMatches(dataMatches)
            setLoading(false);
            return
          }
          setGroup(value)
          const data = filterGroups(matches, value)
          setLoading(false);
          setMatches(data as any)
      };

    const handleChangeRouds = async (event: SelectChangeEvent<any>) => {
        const {target: { value }} = event;
        setLoading(true);
        if(!championshipId){
          setLoading(false);
          return
        }
        const matches = await  getMatches(championshipId as string, value)
        const datas = groupByMatches(matches)
        if(!group){
          setMatches(datas.matches)
          setLoading(false);
          return
        }
        const data = filterGroups(datas.matches, group)
        setMatches(data as any)
        setLoading(false); 
      }; 


      const getMatches = async (idCompetition:string|number,rouds?:number) => {
        if(!idCompetition){
          return 
        }
        const data = await Football.rouds(idCompetition, rouds);
        if(!data.result && !data.result.matches){
          return []
        }
        return data.result.matches
     }

      const getTeams = async (idCompetition:string) => {
        if(!idCompetition){
          return 
        } 
        const data = await Football.teams(idCompetition);
        const teams = data.result.teams.map((team:any)=>({
          name:team.name,
          img:team.crest,
          value:team.id
        }))
        setTeam(teams)
     }

      const groupByMatches = (data:any) => {
        if(!data){
          return {matches:[],rouds:[]}
        }
        const matches = data.reduce((acc:any, match:any) => {
          const key = match.matchday;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(match);
          return acc;
        }, {});
        
        const matchesArray = Object.keys(matches).map(key => ({
          matchday: parseInt(key),
          teams: matches[key].map((match:any) => ({
            homeTeam:  {id:match.homeTeam.id,name:match.homeTeam.name,flag:match.homeTeam.crest},
            awayTeam:  {id:match.awayTeam.id,name:match.awayTeam.name,flag:match.awayTeam.crest}
          }))
        }));
        const roudsArray = Object.keys(matches).map(key => ({
          name:`${key}º Rodada`,
          value:key
        }));
        return {matches:matchesArray,rouds:roudsArray}
      }

       const filterGroups = (matches:any,gropu:number|string)=>{
            const data = matches.map((dataGroup:any)=>{
            for (const team of dataGroup.teams) {
                if (team.awayTeam.id == gropu || team.homeTeam.id == gropu) {
                  return {
                    matchday:dataGroup.matchday,
                    teams:[{
                      homeTeam:  {id:team.homeTeam.id,name:team.homeTeam.name,flag:team.homeTeam.crest},
                      awayTeam:  {id:team.awayTeam.id,name:team.awayTeam.name,flag:team.awayTeam.crest}
                    }]
                  }
                }
            }
          })
          return data
    }

    return (
      <>
        <Header><h2>Tabela do Campeonato</h2></Header>
        <section>
          <div className="container-select">
              <label>Teste</label>
              <TextSelect key={"championship"} options={competitions} text="Selecione o Campeonato" defaultValue={{name:'Selecione',value:''}} onChange={handleChangeChampionship}/>
              <TextSelect key={"group"}  options={team} text="Selecione a Equipe" defaultValue={{name:'Todos',value:''}} onChange={handleChangeGroup} />
              <TextSelect key={"rouds"} options={rouds} text="Selecione a Rodada" defaultValue={{name:'Todos',value:''}} onChange={handleChangeRouds} />
          </div>
        { title&& <div className="title-campionship">
              <IconFlag size="large" src={title.flag}/>
              <h2>{title.name}</h2>
          </div>}
          {loading ? (
            <Loading />
          ) : (
            <div className="groups">
              {matches.map((data, id) => (
                <Matches key={id} data={data} />
              ))}
            </div>
          )}
        </section>
      </>
    )
}

