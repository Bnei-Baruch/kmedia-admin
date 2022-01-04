import React, { useState } from 'react';
import { Button, Label, Table } from 'semantic-ui-react';

const List = ({ setStatus, items = [] }) => {
  const [err, setErr] = useState({});

  const handleSetStatus = (id, accepted) => {
    if (err[id]) {
      delete err[id];
      setErr(err);
    }

    setStatus(id, accepted).catch(e => {
      err[id] = e;
      setErr(err);
    });
  };

  const renderItem = x => {
    const { id, uid, name, author, accepted, tag_uids } = x;
    return (
      <Table.Row
        key={id}
        negative={accepted === false}
        positive={accepted === true}
      >
        <Table.Cell>
          {err[id] && <Label color="red" ribbon content={err[id]} />}
          {uid}
        </Table.Cell>
        <Table.Cell collapsing>
          {tag_uids && tag_uids.join(', ')}
        </Table.Cell>
        <Table.Cell>
          {name}
        </Table.Cell>
        <Table.Cell>
          {author}
        </Table.Cell>
        <Table.Cell collapsing>
          <Button
            color="green"
            onClick={() => handleSetStatus(id, true)}
            content={'Accept'}
            disabled={accepted === true}
          />
          <Button
            color="red"
            onClick={() => handleSetStatus(id, false)}
            content={'Decline'}
            disabled={accepted === false}
          />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>
            UID
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            Tags
          </Table.HeaderCell>
          <Table.HeaderCell>
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>
            Author
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items?.map(renderItem)}
      </Table.Body>
    </Table>
  );
};

export default List;
