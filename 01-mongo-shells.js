// �� DB ���� : �����ͺ��̽� ���� ����� �������� ����
use mydb
show dbs

// ��α� ���񽺸� ����ٴ� ����
db // ���� db Ȯ��
// insert
db. posts.insert({
	title: "Fist Post",
	createAt: new Date()
})

// ���� ���� ������ insert
//		insertMany([ ������ �迭])
db.posts.insertMany([{
	title: "Learning MongoDB",
	content: "����DB�� �н��մϴ�",
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

// ������ ��ȸ
db.posts.findOne()

// ���� ��ü ��ȸ
db.posts.find()

// .save()
/*
	_id�� ���� ���� -> .insert�� ����
	_id�� �ִ� -> �÷��� ���� ���� ����
*/
let post = db.posts.findOne()
post

// post�� createdAt ����
post.createdAt = new Date()
post

db.posts.save(post)

// _id�� ���� ������ save -> insert�� ����
post = {
	title: "New Document",
	createdAt: new Date(),
	hit: 0
}
db.posts.save(post)

/*
.update({ ���� ���� ���� },
	{ $set:
		{ ������ ����}
	}
)
*/
post = db.posts.findOne()
post // ���

// content �ʵ� update
// modifiedAt �ʵ� ����
db.posts.update(
	{ "title": "Fist Post" },
	{ $set: {
			content: "ù��° ����Ʈ",
			modifiedAt: new Date()	         
	         }
	}
)
        
// Ȯ��
db.posts.findOne()

// .remove() : ������ ����
db.posts.find()
        
// title�� New Document�� ���� ����
db.posts.remove({ "title": "New Document" })

post = db.posts.findOne({ "title": "Fist Post"}) // OK
db.posts.remove(post)
post

// ���� ����
/*
����(==): { �ʵ�: �� }
ũ��(>): { �ʵ�: { $gt: �� } }
ũ�ų� ����(>=): { �ʵ�: { $gte: �� } }
�۴�(<): { �ʵ�: { $lt: �� } }
�۰ų� ����(<=): { �ʵ�: { $lte: �� } }
���� �ʴ�(!=) : { �ʵ�: { $ne: �� } }
*/
db.posts.find()

// hit�� 10�� ������
db.posts.find({ hit: 10 })

// hit�� 10�� �ƴ� ������
db.posts.find({ hit: {$ne: 10 } })

// hit�� 50 �̻��� ������
db.posts.find({ hit: { $gte: 50 } })

// $and, $or : �� ������ ���ǵ��� �迭�� ����
// ���� �� hit ���� 20 ~ 50�� ������ �˻�
db.posts.find({
	$and: [
		{ hit: {$gte: 20 } },
		{ hit: {$lte: 50  } }
	]
})

//���� �� hit ���� 20���� �̰ų� 50 �̻��� ������ �˻�
db.posts.find({
	$or: [
		{ hit: { $lte: 20} },
		{ hit: { $gte: 50} }
	]
})

// ��������
// find �޼����� �ι�° ��ü�� ��� �ʵ带 ����
// 1: ���, 0: ��� ����
db.posts.find()
// posts �÷��ǿ��� title, content, hit �ʵ常 ���
db.posts.find({},
	{ "_id": 0,
		"title": 1,
		"content": 1,
		"hit": 1
	}
)


// posts �÷��ǿ��� ��ü���� ���,
// 	title, hit �ʵ� ���, _id ������
// 	2�� �ǳʶٰ�, 4�� ���
db.posts.find({},
	 { "title":1, "hit":1, "_id":0 }
)

db.posts.find({},
	{ "title":1, "hit":1, "_id":0 }
).limit(4).skip(2)
        
// ���� .sort
// 	���� ���� �ʵ�: 1 (��������), -1 (��������)
// hit �ʵ��� ������������ ����
db.posts.find({},
	{ "title":1, "hit":1 }
).sort({ "hit":1 }) // ��������

// hit �ʵ��� ������������ ����
db.posts.find({},
	{ "title":1, "hit":1 }
).sort({ "hit":-1 }) // ��������

