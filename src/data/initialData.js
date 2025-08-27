const initialData = {
    cards: {
        'card-1': {
            id: 'card-1',
            content: 'Create project README'
        },
        'card-2': {
            id: 'card-2',
            content: 'Design board layout'
        },
        'card-3': {
            id: 'card-3',
            content: 'Implement drag & drop'
        },
        'card-4': {
            id: 'card-4',
            content: 'Polish UI'
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            cardIds: ['card-1', 'card-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            cardIds: ['card-3']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            cardIds: ['card-4']
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;