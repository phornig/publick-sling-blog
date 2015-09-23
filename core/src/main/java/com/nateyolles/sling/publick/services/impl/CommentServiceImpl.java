package com.nateyolles.sling.publick.services.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jcr.query.Query;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nateyolles.sling.publick.PublickConstants;
import com.nateyolles.sling.publick.services.CommentService;

/**
 * Service to get, save, and update comments as well as mark them as
 * spam or ham (valid).
 */
@Service(value = CommentService.class)
@Component(immediate = true,
           name = "Publick comments service",
           description = "Service to get, delete, update and add comments.")
public class CommentServiceImpl implements CommentService {

    /**
     * The logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(CommentServiceImpl.class);

    /**
     * JCR_SQL2 query to get all comments in order of newest first.
     */
    private static final String BLOG_QUERY = String.format("SELECT * FROM [%s] AS s WHERE "
            + "ISDESCENDANTNODE([%s]) ORDER BY [%s] desc",
            PublickConstants.NODE_TYPE_COMMENT,
            PublickConstants.COMMENTS_PATH,
            JcrConstants.JCR_CREATED);

    /**
     * Get all Comments in the order of newest to oldest.
     *
     * @param request The current request
     * @return List of all comments
     */
    public List<Resource> getComments(final SlingHttpServletRequest request) {
        final List<Resource> comments = new ArrayList<>();
        final Iterator<Resource> queryResults = request.getResourceResolver().findResources(BLOG_QUERY, Query.JCR_SQL2);

        while (queryResults.hasNext()) {
            comments.add(queryResults.next());
        }

        return comments;
    }

    /**
     * Get the number of replies for a given comment.
     *
     * @param comment The current comment
     * @return The number of replies for the comment
     */
    public int numberOfReplies(final Resource comment) {
        final Iterator<Resource> children = comment.listChildren();
        int size = 0;

        while (children.hasNext()) {
            children.next();
            size++;
        }

        return size;
    }

    /**
     * Get the blog post associated with the given comment.
     *
     * There are only two levels of comments. You can reply to a post
     * and you can reply to a top level comment.
     *
     * @param comment The current comment
     * @return the number of replies to the given comment
     */
    public Resource getParentPost(final Resource comment) {
        final ResourceResolver resolver = comment.getResourceResolver();
        Resource parent = comment.getParent();

        // Try one level up
        Resource post = resolver.getResource(parent.getPath().replace("/comments/", "/blog/"));

        if (post == null) {
            //try two levels up
            parent = parent.getParent();
            post = resolver.getResource(parent.getPath().replace("/comments/", "/blog/"));
        }

        return post;
    }
}