type UserProfilePageProps = {
  params: {
    username: string;
  };
};

const UserProfilePage = ({ params: { username } }: UserProfilePageProps) => {
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Username: {username}</p>
    </div>
  );
};

export default UserProfilePage;
