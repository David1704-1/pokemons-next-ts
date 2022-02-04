import gql from "graphql-tag";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import client from '../../apollo-client'
import { PokemonType,PokemonResponseType } from "../../types";
import { Card } from 'antd'
import 'antd/dist/antd.css'

interface Props {
    pokemon: PokemonType
}

const Pokemon: NextPage<Props> = ({pokemon})=>{
    
    return (
        <>
        <title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1,pokemon.name.length)}</title>
        <Card
            style={{ width: '400px', margin: 'auto',padding:'10px', borderRadius:'20px', marginTop:'30px', marginBottom: '30px' }}
            cover={<img alt="" src={pokemon.sprites.front_default} />}
        >
       <h1 style={{fontFamily: `Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace`}}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1,pokemon.name.length)}</h1>
       <hr style={{border:0,height: '1px',backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/>
       <p style={{fontSize:'16px',fontFamily:'Consolas, monaco, monospace'}}>Moves: {
            pokemon.moves.map((move,index) => {
                if(index === pokemon.moves.length-1)
                    return move.move.name
                return move.move.name +', '
            })   
        }</p>
        <p style={{fontSize:'16px',fontFamily:'Consolas, monaco, monospace'}}>
            Type(s): {
                pokemon.types.map(type => {
                    return type.type.name
                })
            }
        </p>
        </Card>
        </>
    
    )
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext)=>{
    const name = context.query.name
    const {data} = await client.query<PokemonResponseType>({
        query: gql`query pokemon($name: String!) {
            pokemon(name: $name) {
              id
              name
              sprites {
                front_default
              }
              moves {
                move {
                  name
                }
              }
              types {
                type {
                  name
                }
              }
            }
          }`,
          variables:{
              name
          }
    })
    return {
        props:{
            pokemon: data.pokemon
        }
    }
}

export default Pokemon