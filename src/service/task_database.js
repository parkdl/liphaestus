import { firebaseDatabase } from "./firebase";

class TaskDatabase {
    saveTask(userId, date, task) {
        firebaseDatabase.ref(`${userId}/${date.year}/${date.month}/${date.day}/${task.id}`).set(task);
    }
}

export default TaskDatabase;
