import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import api from "@/libs/fetch"
import Google from "next-auth/providers/google"
import Yandex from "next-auth/providers/yandex"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // profile(profile) {
      //   return {
      //     id: profile.sb,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //     login: profile.email ? profile.email.split("@")[0] : null,
      //   };
      // }
    }),
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          scope: "login:email login:info login:avatar",
        },
      },

      //если делать так, то походу создаётся новый профиль, а не входит в существующий
      //но тут можно сразу задавать нужные поля!
      //решить с этим вопрос позже!!!!

      // profile(profile) {
      //   // Если аватар есть, формируем его URL
      //   const avatarUrl = profile.default_avatar_id
      //     ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
      //     : null;

      //   return {
      //     id: profile.id,
      //     name: profile.real_name || profile.display_name,
      //     login: profile.login,
      //     email: profile.default_email,
      //     image: avatarUrl, // Добавляем ссылку на аватар
      //   };
      // },
    }),

    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await api.get(`/users/?email=${email}`);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;


      }
    })

  ]
} satisfies NextAuthConfig