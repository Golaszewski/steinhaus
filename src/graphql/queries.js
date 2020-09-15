/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNetwork = /* GraphQL */ `
  query GetNetwork($id: ID!) {
    getNetwork(id: $id) {
      id
      url
      network
      createdAt
      updatedAt
    }
  }
`;
export const listNetworks = /* GraphQL */ `
  query ListNetworks(
    $filter: ModelNetworkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNetworks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        network
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
