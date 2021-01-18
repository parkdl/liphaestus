import { firebaseDatabase } from "./firebase";

class TaskDatabase {
    syncLists(userId, date, onUpdate) {
        const ref = firebaseDatabase.ref(`${userId}/${date.year}/${date.month}/${date.weekOfYear}/${date.day}`);
        ref.on("value", snapshot => {
            const value = snapshot.val();
            value ? onUpdate(value) : onUpdate({});
        });
        return () => ref.off();
    }

    syncWeekLists(userId, date, onUpdate) {
        const ref = firebaseDatabase.ref(`${userId}/${date.year}/${date.month}/${date.weekOfYear}`);
        ref.on("value", snapshot => {
            const value = snapshot.val();
            value ? onUpdate(value) : onUpdate({});
        });
        return () => ref.off();
    }

    syncMonthLists(userId, date, onUpdate) {
        const ref = firebaseDatabase.ref(`${userId}/${date.year}/${date.month}`);
        ref.on("value", snapshot => {
            const value = snapshot.val();
            value ? onUpdate(value) : onUpdate({});
        });
        return () => ref.off();
    }

    saveTask(userId, date, task) {
        firebaseDatabase.ref(`${userId}/${date.year}/${date.month}/${date.weekOfYear}/${date.day}/${task.id}`).set(task);
    }

    deleteTask(userId, date, taskId) {
        firebaseDatabase.ref(`${userId}/${date.year}/${date.month}/${date.weekOfYear}/${date.day}/${taskId}`).remove();
    }
}

export default TaskDatabase;
