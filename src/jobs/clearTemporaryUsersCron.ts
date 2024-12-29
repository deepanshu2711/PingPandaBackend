import cron from "node-cron";
import { TemporaryUser } from "../model/temporary-user";
import { subDays, startOfDay } from "date-fns";

cron.schedule("0 0 * * 1", async () => {
  const sevenDaysAgo = startOfDay(subDays(new Date(), 7));
  try {
    await TemporaryUser.deleteMany({
      createdAt: { $lte: sevenDaysAgo },
    });
    console.log("Deleted users created 7 days ago or earlier.");
  } catch (error) {
    console.log("Error clearing temporary users:", error);
  }
});
