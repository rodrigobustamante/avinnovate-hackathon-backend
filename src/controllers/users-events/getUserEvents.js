import { USERS_COLLECTION, USER_EVENTS_COLLECTION } from '../../utils';

export const getUsersEvents = async (req, res, db) => {
  const {
    params: { id },
  } = req;

  try {
    const users = await db.getCollection(USERS_COLLECTION);
    const usersEvents = await db.getCollection(USER_EVENTS_COLLECTION);

    const actualUser = users.find((user) => user.clerkId === id);
    const userEvent = usersEvents.filter(
      (uEvent) => uEvent.userId === actualUser.id
    );

    return res.status(200).json({ userEvents: userEvent });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
