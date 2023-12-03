import { USERS_COLLECTION } from '../../utils';

export const createUsers = async (req, res, db) => {
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
    const user = await db.addDocument(USERS_COLLECTION, {
      ...body,
    });

    return res.status(201).json({ message: 'User created', user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
