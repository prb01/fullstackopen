type CoursePart = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((cp) => (
        <p key={cp.name}>
          {cp.name} {cp.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
