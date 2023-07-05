/* 

할일 목록 배열

(property) todos: {
    name: string;
    tags: string[];
    status: string;
    id: number;
}[]
*/
const todo =  { 
	todosArr: [ 
		{
			'name' : '자바스크립트 공부하기', 
			'tags' : ['programming', 'javascript'],
			'status' : 'todo',
			'id' : 12123123
		},
		{
			'name' : '자바스크립트 공부하기2', 
			'tags' : ['programming', 'javascript'],
			'status' : 'todo',
			'id' : 99999
		},
		{
			'name' : ' 그림 그리기', 
			'tags' : ['picture', 'favorite'],
			'status' : 'doing',
			'id' : 312323
		}
	],
	statusCount: {
		todo: 2,
		doing: 1,
		done: 0
	}
};

export default todo