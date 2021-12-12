import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { changeBookmarkStatus, getBookmarks } from '../../api';
import { AuthContext } from '../../App';

const List = ({ setStatus, items = [] }) => {
  const [err, setErr] = useState({});

  const handleSetStatus = (id, accepted) => {
    if (err[id]) {
      delete err[id];
      setErr(err);
    }

    setStatus(id, accepted).catch(err => {
      err[id] = err;
      setErr(err);
    });
  };

  const renderItem = x => {
    const { id, uid, name, accepted, tag_uids } = x;
    return (
      <Table.Row negative={accepted === false} positive={accepted === true} key={id}>
        <Table.Cell collapsing>
          {uid}
        </Table.Cell>
        <Table.Cell collapsing>
          {tag_uids && tag_uids.join(', ')}
        </Table.Cell>
        <Table.Cell>
          {name}
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
          <Table.Cell collapsing>
            UID
          </Table.Cell>
          <Table.Cell collapsing>
            Tags
          </Table.Cell>
          <Table.Cell>
            Name
          </Table.Cell>
          <Table.Cell collapsing>
            Actions
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map(renderItem)}
      </Table.Body>
    </Table>
  );
};

export default List;
