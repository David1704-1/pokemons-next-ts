export interface PokemonsType {
    count: number,
    results: [
        {
            url: string,
            name: string,
            image: string
        }
    ]
} 
export interface PokemonsProps{
    pokemons: PokemonsType,
    count: number
}
export interface PokemonType{
    id: number,
    name: string,
    sprites:{
        front_default: string,
    },
    moves:[
        {
            move:{
                name:string
            }
        }
    ]
    types:[
        {
            type:{
                name:string
            }
        }        
    ]
}
export interface PokemonsResponseType{
    pokemons: PokemonsType
}
export interface PokemonResponseType{
    pokemon: PokemonType
}