# 0.Header UI

- src/Components/에 Header.js 파일을 추가해 주고 이에 맞게 App.js에 import 및 코드 추가.
- src/Components/에 Icons.js 파일도 추가해 주었다.
- input.js에 className을 추가해 주었다.
- Router.js, GlobalStyles.js, Theme.js도 수정하였다. 

# 1.Header Logic

모든 icon들을 가져와서 컴포넌트에 만들어야 한다. icon들은 icons.js에 있다.

link를 타고 들어가면 profile을 볼 수 있도록,
search도 explore도 가능하도록 Route.js에 다음과 같이 추가해준다.
~~~javascript
const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
  </Switch>
);
~~~

serch가 가능하도록 Search.js를 만들어준다.

이번에 추가할 기능은
1. search submit창에 단어를 입력하고 enter를 누르면 search page로 이동하게 해주어야한다. (redirect search)
2. Profile을 클릭하면 현재 로그인 한 내 username의 profile로 이동하도록.
    - 즉, header가 누가 로그인 했는지 볼 수 있는 query API를 가지고 있어야 한다.

hooks를 사용할수록 header는 더욱 더 아름다워 질 것이다. container와 presenter가 필요없게 되기 때문이다.

withRouter를 이용하여 넣으려는 component에다 다른 router의 능력들을 줄 수 있다.
즉, router에 접근하고 싶은데 가지고 있지 않으면, withRouter만 있으면 우리에게 router가 할 수 있는 모든 것들에 access를 준다. 

<Switch>는 단 하나의 라우트만 렌더링 해 준다.

seach에 "Hello"라고 입력하면 http://localhost:3000/#/search?term=hello 로 이동한다.

이제 변경해야 할 것은 Apollo Boost Configuration이다. 왜냐하면 지금, Apollo boost에서 API에 Token을 보내고 있지 않기 때문이다.

Client.js에 다음과 같은 코드를 추가한다.
~~~javascript
headers: {
    "Authorization: `Bearer ${localStorage.getItem("token")}`
}
~~~

이제 크롬 inspector의 Network의 localhost를 보면 bearer의 token을 볼 수 있다.

추가로 backend의 me.js에서 리턴방식을 바꿔주어야 한다.
~~~javascript
return await prisma.user({ id: user.id });
~~~
위와 같이 바꾼이유는 이제는 post를 가져올 필요가 없기 때문이다.
computed fields 덕분에 원하면 언제든 가져올 수 있기 때문이다.

TypeError: Cannot read property 'me' of undefined  에러가 나는데
~~~javascript
const { data, loading } = useQuery(ME);
if (loading) return "";
~~~

이렇게 하니 작동이 된다.
me 쿼리를 통해 데이터를 받아오기 전에 화면이 렌더링 돼서 그런 것이라 생각이 든다.

이제 profile로 들어가면 링크에 id가 뜬다.