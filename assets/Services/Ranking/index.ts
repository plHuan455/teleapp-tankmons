import { ListRankResponse } from "./types";

export async function listRankService(): Promise<ListRankResponse> {
  return {
    ranks: [
      {
        id: 1,
        name: 'ALEXANDRA SMITH',
        inviteCount: 345,
        coin: 50,
        rank: 1
      },
      {
        id: 2,
        name: 'MICHAEL JOHNSON',
        inviteCount: 345,
        coin: 30,
        rank: 2
      },
      {
        id: 3,
        name: 'SOPHIA WILLIAMS',
        inviteCount: 345,
        coin: 20,
        rank: 3
      },
      {
        id: 3,
        name: 'SOPHIA WILLIAMS',
        inviteCount: 345,
        coin: 20,
        rank: 3
      },
      {
        id: 4,
        name: 'SOPHIA WILLIAMS',
        inviteCount: 345,
        coin: 20,
        rank: 4
      },
    ]
  }
}