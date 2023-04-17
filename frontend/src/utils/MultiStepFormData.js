
const steps = [
    {
      label: "Step 1",
      description: "First step description",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          isRequired: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          isRequired: true,
        },
      ],
    },
    {
      label: "Step 2",
      description: "Second step description",
      fields: [
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          isRequired: true,
        },
        {
          name: "passwordConfirmation",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm your password",
          isRequired: true,
        },
      ],
    },
  ];

  export default steps;