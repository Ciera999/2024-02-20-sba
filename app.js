// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function calculateWeightedAverage(assignments, submissions) {
    let totalPoints = 0;
    let weightedSum = 0;
  
    for (const assignment of assignments) {
      const submission = submissions.find(sub => sub.assignment_id === assignment.id);
  
      if (submission && submission.submitted_at <= assignment.due_at) {
        const latePenalty = submission.submitted_at > assignment.due_at ? 0.9 : 1;
        const percentage = (submission.score / assignment.points_possible) * latePenalty;
  
        totalPoints += assignment.points_possible;
        weightedSum += percentage * assignment.points_possible;
      }
    }
  
    return totalPoints === 0 ? 0 : (weightedSum / totalPoints);
  }
  
  function getLearnerData(course, ag, submissions) {
    const result = [];
  
    for (const submission of submissions) {
      const learnerData = result.find(data => data.id === submission.learner_id);
  
      if (!learnerData) {
        result.push({
          id: submission.learner_id,
          avg: 0,
        });
      }
    }
  
    for (const learnerData of result) {
      learnerData.avg = calculateWeightedAverage(ag.assignments, submissions.filter(sub => sub.learner_id === learnerData.id));
  
      for (const assignment of ag.assignments) {
        const submissionData = submissions.find(sub => sub.learner_id === learnerData.id && sub.assignment_id === assignment.id);
  
        if (submissionData && submissionData.submitted_at <= assignment.due_at) {
          const latePenalty = submissionData.submitted_at > assignment.due_at ? 0.9 : 1;
          const percentage = (submissionData.score / assignment.points_possible) * latePenalty;
  
          learnerData[assignment.id] = percentage;
        }
      }
    }
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  