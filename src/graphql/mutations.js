/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createNetwork = /* GraphQL */ `
  mutation CreateNetwork(
    $input: CreateNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    createNetwork(input: $input, condition: $condition) {
      id
      url
      network
      createdAt
      updatedAt
    }
  }
`;
export const updateNetwork = /* GraphQL */ `
  mutation UpdateNetwork(
    $input: UpdateNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    updateNetwork(input: $input, condition: $condition) {
      id
      url
      network
      createdAt
      updatedAt
    }
  }
`;
export const deleteNetwork = /* GraphQL */ `
  mutation DeleteNetwork(
    $input: DeleteNetworkInput!
    $condition: ModelNetworkConditionInput
  ) {
    deleteNetwork(input: $input, condition: $condition) {
      id
      url
      network
      createdAt
      updatedAt
    }
  }
`;
