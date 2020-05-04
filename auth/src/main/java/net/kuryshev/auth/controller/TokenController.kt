package net.kuryshev.auth.controller

import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import java.util.*
import java.util.stream.Collectors
import javax.annotation.Resource
import javax.servlet.http.HttpServletRequest

@Controller
class TokenController {
    @Resource(name = "tokenServices")
    private lateinit var tokenServices: ConsumerTokenServices
    @Resource(name = "tokenStore")
    private lateinit var tokenStore: TokenStore

    @ResponseBody
    @RequestMapping(method = [RequestMethod.POST], value = ["/oauth/token/revokeById/{tokenId}"])
    fun revokeToken(request: HttpServletRequest?, @PathVariable tokenId: String?) {
        tokenServices.revokeToken(tokenId)
    }

    @ResponseBody
    @RequestMapping(method = [RequestMethod.GET], value = ["/tokens"])
    fun getTokens(): List<String> {
        val tokens = tokenStore.findTokensByClientId("sampleClientId")
        return Optional.ofNullable(tokens).orElse(emptyList()).stream().map { obj: OAuth2AccessToken -> obj.value }.collect(Collectors.toList())
    }

    @ResponseBody
    @RequestMapping(method = [RequestMethod.POST], value = ["/tokens/revokeRefreshToken/{tokenId:.*}"])
    fun revokeRefreshToken(@PathVariable tokenId: String): String {
        if (tokenStore is JdbcTokenStore) {
            (tokenStore as JdbcTokenStore).removeRefreshToken(tokenId)
        }
        return tokenId
    }
}