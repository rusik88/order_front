import MenuBlockComponent from './blocks/MenuBlockComponent.tsx';

const SidebarComponent = () => {
    return (
        <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-md p-6">
            <MenuBlockComponent />
        </aside>
    );
};

export default SidebarComponent;