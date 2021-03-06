import React from 'react';
import { connect } from 'react-redux';
import {
  kickUser,
  promoteUser,
  demoteUser,
  recheckAdmin
} from '../actions/groups';

/**
 * This component is used for GroupSettingsModal to display the
 * list of users, as well as the respective buttons for kicking
 * or editing.
 */
export const GroupUserListing = ({
  users,
  setUsers,
  group,
  admin,
  setAdmin,
  uid,
  kickUser,
  kickUserLocal,
  setError
}) => {
  const onKick = (user, group) => {
    // Remove from users
    return recheckAdmin(uid, group).then(isAdmin => {
      if (isAdmin) {
        return kickUser(user, group)
          .then(() => kickUserLocal(user.uid))
          .then(() => setUsers(users.filter(u => u.uid !== user.uid)))
          .catch(error => console.log(error));
      } else {
        setAdmin(false);
        setError('You are not an admin!');
        return Promise.resolve()
      }
    });
  };

  const onPromote = (user, group) =>
    recheckAdmin(uid, group).then(isAdmin => {
      if (isAdmin) {
        return promoteUser(user, group).then(() => {
          setUsers(
            users.map(u => (u.uid === user.uid ? { ...u, admin: true } : u))
          );
          return Promise.resolve();
        });
      } else {
        setAdmin(false);
        setError('You are not an admin!');
        return Promise.resolve();
      }
    });

  const onDemote = (user, group) =>
    recheckAdmin(uid, group).then(isAdmin => {
      if (isAdmin) {
        return demoteUser(user, group).then(() => {
          setUsers(
            users.map(u => (u.uid === user.uid ? { ...u, admin: false } : u))
          );
          return Promise.resolve();
        });
      } else {
        setAdmin(false);
        setError('You are not an admin!');
        return Promise.resolve();
      }
    });

  // The other buttons can only be seen if the current user is an admin.
  return (
    <div className="bordertop">
      {users.map(user => (
        <div key={user.uid} className="userwrapper">
          <div>
            <p className="list-header__text">
              {user.displayName}
              {user.uid === uid && '(You)'}
            </p>
          </div>
          <div>
            {admin && !user.admin && (
              <button
                className="button button--norm-small button--right"
                onClick={() => onPromote(user, group)}
              >
                Make admin
              </button>
            )}
            {admin && user.admin && user.uid !== uid && (
              <button
                className="button button--norm-small button--right"
                onClick={() => onDemote(user, group)}
              >
                Demote admin
              </button>
            )}
            {admin && user.uid !== uid && (
              <button
                className="button button--norm-small button--right"
                onClick={() => onKick(user, group)}
              >
                Kick
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  kickUser: (user, group) => dispatch(kickUser(user, group))
});

export default connect(undefined, mapDispatchToProps)(GroupUserListing);
