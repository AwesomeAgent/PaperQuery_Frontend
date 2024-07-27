export interface TokenData {
  access_token: string
  token_type: string
  expire: number
}

export interface Knowledge {
  knowledgeID: string
  knowledgeName: string
  knowledgeDescription: string
  documentNum: number
  vectorNum: number
}

export interface LibraryInfo {
  libraryID: string
  knowledgeNumSum: number
  documentNumSum: number
  vectorNumSum: number
}

export interface LoginResponse {
  status_code: number
  msg: string
  data: TokenData
}

export interface LibraryInfoResponse {
  status_code: number
  msg: string
  data: LibraryInfo
}

export interface KnowledgeListResponse {
  status_code: number
  msg: string
  data: {
    knowledgeList: Array<Knowledge>
  }
}

export interface KnowledgeResponse {
  status_code: number
  msg: string
  data: Knowledge
}

export interface Document {
  documentID: string
  documentName: string
  documentStatus: number
  documentTags: Array<string>
  vectorNum: number
  createTime: number
}

export interface ChatRequest {
  question: string
  ref: {
    knowledgeID: string
    documentID: string
    page: number
    selectedText: string
  }
  context: string
}
