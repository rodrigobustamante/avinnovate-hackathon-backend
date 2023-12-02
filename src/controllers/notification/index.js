import { Notification } from "../../models/notificationSchema";

export function createNotification(data) {
  try {
    const notification = new Notification(data);
    const newNotification = notification.save();
    if(!newNotification) throw new Error("Error creating notification");
    return {
      success: true,
      data: newNotification,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
