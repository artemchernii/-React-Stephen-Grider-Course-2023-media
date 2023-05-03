import './App.css';
import UsersList from './components/UsersList';
import PostsList from './components/PostsList';
function App() {
    return (
        <div className="container mx-auto">
            <UsersList />
            <PostsList />
        </div>
    );
}

export default App;
