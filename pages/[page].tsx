import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import client from '../apollo-client'
import gql from 'graphql-tag'
import { PokemonsProps,PokemonsResponseType } from '../types'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'
import Router from 'next/router'
import {Row, Col, Card} from 'antd'

const Page: NextPage<PokemonsProps> = ({pokemons, count}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{fontFamily: `Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace`, marginBottom: '20px'}}>Pokemons</h1>       
        
        <div className={styles.grid} style={{marginBottom:'30px'}}>          
        <Row gutter={[16,24]}>
            {
                pokemons.results.map(res => {                    
                    return(
                        <Col className="gutter-row" span={6} key={res.name}>
                            <a href={'pokemon/' + res.name}>                       
                                <Card
                                hoverable
                                style={{ width: 240, borderRadius:'20px' }}
                                cover={<img alt="" src={res.image} />}
                                >
                                  <hr style={{border:0,height: '1px',backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/>
                                    <h2 style={{fontFamily: `Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace`}}>{res.name.charAt(0).toUpperCase()+res.name.substring(1,res.name.length)} &rarr;</h2>
                                </Card>
                            </a>
                        </Col>
                    )
                })
            }   
        </Row>
        </div>
        <Pagination 
            total={count}
            onChange={(page) => {Router.push('/' + page)}}
            showSizeChanger={false}
            pageSize={16}
          />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const limit = 16
  const offset = parseInt(context.query.page as string) * limit
  const {data} = await client.query<PokemonsResponseType>({
    query: gql`
      query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count  
          results {
            name
            image
          }
        }
      }
  `,
    variables:{
      limit,
      offset
    },
  })
   return {  
     props: {
       pokemons: data.pokemons,
       count: data.pokemons.count    
     }
   }
}
export default Page
