import gql from "graphql-tag";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import client from "../../apollo-client";
import { PokemonType, PokemonResponseType } from "../../types";
import { Card } from "antd";
import "antd/dist/antd.css";
import { card_style, h1_font_style, hr_style, p_style } from "../../styles";

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
        cover={<img alt="" src={pokemon.sprites.front_default} />}
      >
        <h1 style={h1_font_style}>
          {pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.substring(1, pokemon.name.length)}
        </h1>
        <hr style={hr_style} />
        <p style={p_style}>
          Moves:{" "}
          {pokemon.moves.map((move, index) => {
            if (index === pokemon.moves.length - 1) return move.move.name;
            return move.move.name + ", ";
          })}
        </p>
        <p style={p_style}>
          Type(s):{" "}
          {pokemon.types.map((type) => {
            return type.type.name;
          })}
        </p>
      </Card>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const name = context.query.name;
  const { data } = await client.query<PokemonResponseType>({
    query: gql`
      query pokemon($name: String!) {
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
