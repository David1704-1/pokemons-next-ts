import gql from "graphql-tag";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import client from "../../apollo-client";
import { PokemonType, PokemonResponseType } from "../../types";
import { Card } from "antd";
import "antd/dist/antd.css";
import { card_style, h1_font_style, hr_style, p_style } from "../../styles";
import Image from "next/image";

interface Props {
  pokemon: PokemonType;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const pokemon_name =
    pokemon.name.charAt(0).toUpperCase() +
    pokemon.name.substring(1, pokemon.name.length);
  return (
    <>
      <title>{pokemon_name}</title>
      <Card
        style={card_style}
        cover={
          <Image
            src={pokemon.sprites.front_default}
            alt=""
            width={400}
            height={400}
          />
        }
      >
        <h1 style={h1_font_style}>
          {pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.substring(1, pokemon.name.length)}
        </h1>
        <hr style={hr_style} />
        <p style={p_style}>
          Type(s):{" "}
          {pokemon.types.map((type, index) => {
            if (index === pokemon.types.length - 1) return type.type.name;
            return type.type.name + ", ";
          })}
        </p>
        <p style={p_style}>
          Abilities:{" "}
          {pokemon.abilities.map((ability, index) => {
            if (index === pokemon.abilities.length - 1)
              return ability.ability.name;
            return ability.ability.name + ", ";
          })}
        </p>
        <p style={p_style}>
          Stats:
          <ul>
            {pokemon.stats.map((stat, index) => {
              if (index === pokemon.stats.length - 1)
                return (
                  <li
                    key={stat.stat.name}
                  >{`${stat.stat.name}: ${stat.base_stat}`}</li>
                );
              return (
                <li
                  key={stat.stat.name}
                >{`${stat.stat.name}: ${stat.base_stat}, `}</li>
              );
            })}
          </ul>
        </p>
      </Card>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const name = context.query.name;
  let { data } = await client.query<PokemonResponseType>({
    query: gql`
      query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          abilities {
            ability {
              name
            }
          }
          stats {
            base_stat
            stat {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }
    `,
    variables: {
      name,
    },
  });
  return {
    props: {
      pokemon: data.pokemon,
    },
  };
};

export default Pokemon;
