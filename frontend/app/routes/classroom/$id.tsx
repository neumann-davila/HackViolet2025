import { LoaderFunction, json, useLoaderData } from "remix"
import ClassroomLayout from "~/src/ClassroomLayout";
// way to fetch classroom data json

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Response("Classroom ID is required", { status: 400 });
  }

  const classroom = {
    
  } // Classroom Json File Getter await getClassroomById(id);

  if (!classroom) {
    throw new Response("Classroom not found", { status: 404 });
  }

  return json(classroom);
};

export default function ClassroomPage() {
  const classroom = useLoaderData();
  return (
    <div>
      <h1>Classroom: {classroom.className}</h1>
      <ClassroomLayout classroom={classroom} />
    </div>
  );
}