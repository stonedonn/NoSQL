// 새 DB 생성 : 데이터베이스 생성 명령은 존재하지 않음
use mydb
show dbs

// 블로그 서비스를 만든다는 가정
db // 현재 db 확인
// insert
db. posts.insert({
	title: "Fist Post",
	createAt: new Date()
})

// 여러 개의 문서를 insert
//		insertMany([ 문서의 배열])
db.posts.insertMany([{
	title: "Learning MongoDB",
	content: "몽고DB를 학습합니다",
	createdAt: new Date(),
	hit : 100
}, {
	title: "Python Programming",
	createdAt : new Date(),
	hit: 10	
}, {
	title: "Oracle Database",
	createdAt: new Date(),
	hit: 30
}])

// 문서의 조회
db.posts.findOne()

// 문저 전체 조회
db.posts.find()

// .save()
/*
	_id가 없는 문서 -> .insert와 동일
	_id가 있다 -> 컬렉션 내부 문서 갱신
*/
let post = db.posts.findOne()
post

// post에 createdAt 세팅
post.createdAt = new Date()
post

db.posts.save(post)

// _id가 없는 문서의 save -> insert와 동일
post = {
	title: "New Document",
	createdAt: new Date(),
	hit: 0
}
db.posts.save(post)

/*
.update({ 변경 문서 조건 },
	{ $set:
		{ 변경할 내용}
	}
)
*/
post = db.posts.findOne()
post // 출력

// content 필드 update
// modifiedAt 필드 세팅
db.posts.update(
	{ "title": "Fist Post" },
	{ $set: {
			content: "첫번째 포스트",
			modifiedAt: new Date()	         
	         }
	}
)
        
// 확인
db.posts.findOne()

// .remove() : 문서를 삭제
db.posts.find()
        
// title이 New Document인 문서 삭제
db.posts.remove({ "title": "New Document" })

post = db.posts.findOne({ "title": "Fist Post"}) // OK
db.posts.remove(post)
post

// 조건 연산
/*
같다(==): { 필드: 값 }
크다(>): { 필드: { $gt: 값 } }
크거나 같다(>=): { 필드: { $gte: 값 } }
작다(<): { 필드: { $lt: 값 } }
작거나 같다(<=): { 필드: { $lte: 값 } }
같지 않다(!=) : { 필드: { $ne: 값 } }
*/
db.posts.find()

// hit가 10인 문서들
db.posts.find({ hit: 10 })

// hit가 10이 아닌 문서들
db.posts.find({ hit: {$ne: 10 } })

// hit가 50 이상인 문서들
db.posts.find({ hit: { $gte: 50 } })

// $and, $or : 논리 조합의 조건들을 배열로 전달
// 문서 중 hit 수가 20 ~ 50인 문서들 검색
db.posts.find({
	$and: [
		{ hit: {$gte: 20 } },
		{ hit: {$lte: 50  } }
	]
})

//문서 중 hit 수가 20이하 이거나 50 이상인 문서들 검색
db.posts.find({
	$or: [
		{ hit: { $lte: 20} },
		{ hit: { $gte: 50} }
	]
})

// 프로젝션
// find 메서드의 두번째 객체로 출력 필드를 제어
// 1: 출력, 0: 출력 안함
db.posts.find()
// posts 컬렉션에서 title, content, hit 필드만 출력
db.posts.find({},
	{ "_id": 0,
		"title": 1,
		"content": 1,
		"hit": 1
	}
)


// posts 컬렉션에서 전체문서 대상,
// 	title, hit 필드 출력, _id 가리기
// 	2개 건너뛰고, 4개 출력
db.posts.find({},
	 { "title":1, "hit":1, "_id":0 }
)

db.posts.find({},
	{ "title":1, "hit":1, "_id":0 }
).limit(4).skip(2)
        
// 정렬 .sort
// 	정렬 기준 필드: 1 (오름차순), -1 (내림차순)
// hit 필드의 오름차순으로 정렬
db.posts.find({},
	{ "title":1, "hit":1 }
).sort({ "hit":1 }) // 오름차순

// hit 필드의 내림차순으로 정렬
db.posts.find({},
	{ "title":1, "hit":1 }
).sort({ "hit":-1 }) // 오름차순

