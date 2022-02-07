import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import client from "../apollo-client";
import gql from "graphql-tag";
import { PokemonsProps, PokemonsResponseType } from "../types";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import Router from "next/router";
import { Row, Col, Card } from "antd";
import { hr_style, h2_font_style } from "../styles";
import Image from "next/image";

const Page: NextPage<PokemonsProps> = ({ pokemons, count, page }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          }
          width={500}
          height={200}
          alt=""
        />

        <div className={styles.grid} style={{ marginBottom: "30px" }}>
          <Row gutter={[16, 24]}>
            {pokemons.results.map((res) => {
              const pokemon_name =
                res.name.charAt(0).toUpperCase() +
                res.name.substring(1, res.name.length);
              return (
                <Col className="gutter-row" span={6} key={res.name}>
                  <a href={"pokemon/" + res.name}>
                    <Card
                      hoverable
                      style={{ width: 240, borderRadius: "20px" }}
                      cover={
                        <Image
                          src={res.artwork}
                          width={250}
                          height={250}
                          alt=""
                        />
                      }
                    >
                      <hr style={hr_style} />
                      <h2 style={h2_font_style}>{pokemon_name} &rarr;</h2>
                    </Card>
                  </a>
                </Col>
              );
            })}
          </Row>
        </div>
        <Pagination
          total={count}
          onChange={(page) => {
            Router.push("/" + page);
          }}
          showSizeChanger={false}
          pageSize={16}
          current={parseInt(page)}
        />
      </main>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const limit = 16;
  const offset = parseInt(context.query.page as string) * limit;
  const { data } = await client.query<PokemonsResponseType>({
    query: gql`
      query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          results {
            name
            artwork
          }
        }
      }
    `,
    variables: {
      limit,
      offset,
    },
  });
  return {
    props: {
      pokemons: data.pokemons,
      count: data.pokemons.count,
      page: context.query.page,
    },
  };
};
export default Page;
