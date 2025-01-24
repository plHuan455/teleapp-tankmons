export interface IRank {
  id: number
  name: string
  inviteCount: number
  coin: number
  rank: number
}

export interface ListRankResponse {
  ranks: IRank[]
}
