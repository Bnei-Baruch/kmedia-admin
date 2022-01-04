import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import { changeLabelStatus, getLabels } from '../../api';
import { AuthContext } from '../../App';
import LabelList from './List';
import { kc } from '../UserManagement';

const Page = () => {
  const [accepted, setAccepted] = useState();
  const [items, setItems]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [err, setErr]           = useState(null);

  const location        = useLocation();
  const { page_no = 1 } = location.search;

  const token = useContext(AuthContext);

  useEffect(() => {
    if (err) {
      setErr(null);
    }
    getLabels(token, page_no, accepted)
      .then(r => {
        setItems(r.items);
        setTotal(r.total);
      })
      .catch(setErr);
  }, [page_no, token, accepted]);

  const handleSetStatus = (id, accepted) => {
    return changeLabelStatus(id, token, accepted).then(r => {
      const _items  = [...items];
      const item    = _items.find(x => x.id === id);
      item.accepted = accepted;
      setItems(_items);
      return r;
    });
  };

  const logout = () => kc.logout();

  return (
    <Segment>
      <Header as="h2">
        Labels
        <Header.Subheader>{`Total: ${total}`}</Header.Subheader>
        <Button floated="right" color="red" onClick={logout} content="Logout" />
      </Header>
      <Button.Group>
        <Button
          disabled={accepted === undefined}
          onClick={() => setAccepted(undefined)}
        >
          All
        </Button>
        <Button
          disabled={accepted === null}
          onClick={() => setAccepted(null)}
        >
          Not changed
        </Button>
        <Button
          disabled={accepted === true}
          onClick={() => setAccepted(true)}
        >
          Accepted
        </Button>
        <Button
          disabled={accepted === false}
          onClick={() => setAccepted(false)}
        >
          Declined
        </Button>
      </Button.Group>
      {
        err ? <Header as="h2" color="red" content={err} /> : <LabelList setStatus={handleSetStatus} items={items} />
      }
    </Segment>
  );
};

export default Page;
