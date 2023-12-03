import { USERS_COLLECTION } from '../../utils';

export const editUser = async (req, res, db) => {
  const { body } = req;

  if (
    !body?.clerkId ||
    !body?.email ||
    !body?.oneSignalId ||
    !body?.phone ||
    !body?.name ||
    !body?.lastname
  ) {
    res.status(400).json({ message: 'Invalid body' });
  }

  try {
    const { clerkId } = body;

    const users = await db.getCollection(USERS_COLLECTION);
    const userToFind = users.find((user) => user.clerkId === clerkId);

    if (!userToFind) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { id, oneSignalIds = [] } = userToFind;
    const { oneSignalId } = body;

    const newOneSignalIds = [...oneSignalIds];
    newOneSignalIds.indexOf(oneSignalId) === -1 &&
      newOneSignalIds.push(oneSignalId);

    delete body.oneSignalId;

    const user = await db.setDocument(USERS_COLLECTION, id, {
      ...body,
      id,
      oneSignalIds: newOneSignalIds,
    });

    return res.status(201).json({ message: 'User edited', user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
