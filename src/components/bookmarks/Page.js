import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { changeBookmarkStatus, getBookmarks } from '../../api';
import { AuthContext } from '../../App';
import BookmarkList from './List';

const acceptStatus = {
  all: '',
  none: 'null',
  accepted: 'accepted',
  declined: 'declined'
};
const Page         = () => {
  const [statusOnly, setFilter] = useState(acceptStatus.all);
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
    getBookmarks(token, page_no, statusOnly)
      .then(r => {
        if (r.status === 'error') {
          setErr(r.error);
          return;
        }
        setItems(r.items);
        setTotal(r.total);
      });
  }, [page_no, token, statusOnly]);

  const handleSetStatus = (id, accepted) => {
    return changeBookmarkStatus(id, token, accepted).then(r => {
      if (r.status === 'error') {
        throw new Error(r.error);
      }
      const _items  = [...items];
      const item    = _items.find(x => x.id === id);
      item.accepted = accepted;
      setItems(_items);
      return r;
    });
  };

  return (
    <Segment>
      <Header as="h2">
        Bookmarks
        <Header.Subheader>{`Total: ${total}`}</Header.Subheader>
      </Header>
      <Button.Group>
        <Button
          disabled={statusOnly === acceptStatus.all}
          onClick={() => setFilter(acceptStatus.all)}
        >
          All
        </Button>
        <Button
          disabled={statusOnly === acceptStatus.none}
          onClick={() => setFilter(acceptStatus.none)}
        >
          Not changed
        </Button>
        <Button
          disabled={statusOnly === acceptStatus.accepted}
          onClick={() => setFilter(acceptStatus.accepted)}
        >
          Accepted
        </Button>
        <Button
          disabled={statusOnly === acceptStatus.declined}
          onClick={() => setFilter(acceptStatus.declined)}
        >
          Declined
        </Button>
      </Button.Group>
      {
        err ? <Header as="h2" content={err.load} /> : <BookmarkList setStatus={handleSetStatus} items={items} />
      }
    </Segment>
  );
};

export default Page;
