package com.nateyolles.sling.publick.services.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.jcr.Session;
import javax.jcr.RepositoryException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nateyolles.sling.publick.utils.VltUtils;
import com.nateyolles.sling.publick.services.PackageService;
import com.nateyolles.sling.publick.services.SystemSettingsService;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.jackrabbit.vault.fs.api.WorkspaceFilter;
import org.apache.jackrabbit.vault.packaging.ExportOptions;
import org.apache.jackrabbit.vault.packaging.JcrPackage;
import org.apache.jackrabbit.vault.packaging.JcrPackageManager;
import org.apache.jackrabbit.vault.packaging.Packaging;
import org.apache.jackrabbit.vault.packaging.VaultPackage;
import org.apache.sling.api.SlingHttpServletRequest;

/**
 * Service to get, create, upload, install and delete packages.
 */
@Service( value = PackageService.class )
@Component( immediate = true )
public class PackageServiceImpl implements PackageService {

    /** Service to get the JCR Package Manager */
    @Reference
    private Packaging packaging;

    /** Service to get the system temporary folder for creating packages */
    @Reference
    private SystemSettingsService settingsService;

    /** The logger */
    private static final Logger LOGGER = LoggerFactory.getLogger(PackageServiceImpl.class);

    /** Default package group name for Publick backups */
    private static final String BACKUP_GROUP = "publick_backup";

    /** Default package version for Publick backups */
    private static final String BACKUP_VERSION = "1.0";

    /** Default package paths for Publick backups */
    private static final String[] BACKUP_PATHS = {"/content/assets", "/content/blog", "/content/comments"};

    /**
     * Get the list of all packages in order of newest to oldest.
     *
     * @param request The Sling HTTP servlet request
     * @return List of all JCR Packages
     */
    public List<JcrPackage> getPackageList(final SlingHttpServletRequest request) {
        Session session = request.getResourceResolver().adaptTo(Session.class);
        JcrPackageManager packageManager = packaging.getPackageManager(session);
        List<JcrPackage> packages = null;

        try {
            packages = packageManager.listPackages();
        } catch (RepositoryException e) {
            LOGGER.error("Could not get package list", e);
        }

        return packages;
    }

    /**
     * Create a JCR package and store it under /etc/packages/group_name/package_name-version.zip.
     * {@link org.apache.sling.distribution.serialization.impl.vlt.JcrVaultDistributionPackageBuilder#createPackageForAdd}
     *
     * @param request The Sling HTTP servlet request
     * @param groupName The name of the package group
     * @param packageName The name of the package
     * @param version The version of the package
     * @param paths The JCR paths to include in the package
     * @return true if package is created successfully
     */
    public boolean createPackage(final SlingHttpServletRequest request, final String groupName,
            final String packageName, final String version, final String[] paths) {

        Session session = null;
        VaultPackage vaultPackage = null;
        File tempDirectory = VltUtils.getTempFolder(settingsService.getTemporaryDirectory());

        try {
            session = request.getResourceResolver().adaptTo(Session.class);

            WorkspaceFilter filter = VltUtils.createFilter(paths, true);
            ExportOptions opts = VltUtils.getExportOptions(filter, paths, groupName, packageName, version);

            vaultPackage = VltUtils.createPackage(packaging.getPackageManager(), session, opts, tempDirectory);

            uploadPackage(session, vaultPackage);
            session.save();
        } catch (Exception e) {
            VltUtils.deletePackage(vaultPackage);
        } finally {
            if (session != null && session.isLive()) {
                session.logout();
                session = null;
            }
        }

        return true;
    }

    /**
     * Create a Publick backup package.
     *
     * @param request The Sling HTTP servlet request
     * @param packageName The name of the package
     * @return true if package is created successfully
     */
    public boolean createBackupPackage(final SlingHttpServletRequest request, final String packageName) {
        return createPackage(request, BACKUP_GROUP, packageName, BACKUP_VERSION, BACKUP_PATHS);
    }

    /**
     * Create package in the JCR under /etc/packages/group_name.
     * {@link org.apache.sling.distribution.serialization.impl.vlt.JcrVaultDistributionPackageBuilder#uploadPackage}
     *
     * @param session The current session
     * @param pack the Vault Package to upload
     * @return the JCR Package from the uploaded file
     * @throws IOException
     * @throws RepositoryException
     */
    private JcrPackage uploadPackage(Session session, VaultPackage pack) throws IOException, RepositoryException {
        JcrPackageManager packageManager = packaging.getPackageManager(session);

        InputStream in = FileUtils.openInputStream(pack.getFile());

        try {
            JcrPackage jcrPackage = packageManager.upload(in, true);
            return jcrPackage;
        } finally {
            IOUtils.closeQuietly(in);
        }
    }
}