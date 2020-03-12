export const defaults = {
    // token여부를 보고 true false 구분.
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
  };
  
  export const resolvers = {
    Mutation: {
      logUserIn: (_, { token }, { cache }) => {
        localStorage.setItem("token", token);
        cache.writeData({
          data: {
            isLoggedIn: true
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("token");
        window.location.reload();
        return null;
      }
    }
  };