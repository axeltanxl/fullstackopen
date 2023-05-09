const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <div key={part.id}>
                <Part part={part}></Part>
            </div>
        )}
    </>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p>total of {total} exercises</p>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <div key={course.id}>
                    <Header name={course.name}></Header>
                    <Content parts={course.parts}></Content>
                    <Total parts={course.parts}></Total>
                </div>
            )}
        </div>
    )
}

export default Course