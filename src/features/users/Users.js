import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import { ListGroup } from "react-bootstrap";
export default function Users() {
  const { data, isError, isLoading, isSuccess, error } = useGetUsersQuery();
  let content;
  if (isSuccess) {
    content = (
      <ListGroup>
        {data.map((user) => {
          return (
            <ListGroup.Item key={user._id}>
              {`${user.firstname}  ${user.lastname}`}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  return <div>{content}</div>;
}
